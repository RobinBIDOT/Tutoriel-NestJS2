import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './Dto/signupDto';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { MailerService } from '../mailer/mailer.service';
import { SigninDto } from './Dto/signinDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDemandDto } from './Dto/resetPasswordDemandDto';
import { ResetPasswordConfirmationDto } from './Dto/resetPasswordConfirmationDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signup(signupDto: SignupDto) {
        const { email, password, username } = signupDto;
        // Check if user already exists
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (user) throw new ConflictException('User already exists');
        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        // Save the user in the database
        await this.prismaService.user.create({ data: { email, username, password: hash } });
        // Send a confirmation email
        await this.mailerService.sendSignupConfirmation(email);
        return { data: 'User successfully created' };
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        // Check if user exists
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');
        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Password does not match');
        // Generate a JWT token
        const payload = { sub: user.userId, email: user.email };
        const token = this.jwtService.sign(payload, { expiresIn: '2h', secret: this.configService.get('SECRET_KEY') });
        return { token, user: { username: user.username, email: user.email } };
    }

    async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
        const { email } = resetPasswordDemandDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');
        const code = speakeasy.totp({
            secret: this.configService.get('OTP_CODE'),
            digits: 5,
            step: 60 * 15,
            encoding: 'base32',
        });
        const url = 'http://localhost:3000/auth/reset-password-confirmation';
        await this.mailerService.sendResetPassword(email, url, code);
        return { data: 'Reset password mail has been sent' };
    }

    async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        const { code, email, password } = resetPasswordConfirmationDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');
        const match = speakeasy.totp.verify({
            secret: this.configService.get('OTP_CODE'),
            token: code,
            digits: 5,
            step: 60 * 15,
            encoding: 'base32',
        });
        if (!match) throw new UnauthorizedException('Invalid/expired token');
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.update({ where: { email }, data: { password: hash } });
        return { data: 'Password updated' };
    }
}
