import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService) {}

    private async transporter() {
        console.log('Mail Host:', this.configService.get('MAIL_HOST'));
        console.log('Mail Port:', this.configService.get('MAIL_PORT'));
        console.log('Mail User:', this.configService.get('MAIL_USER'));

        const transport = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: +this.configService.get('MAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASS'),
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        return transport;
    }

    async sendSignupConfirmation(userEmail: string) {
        (await this.transporter()).sendMail({
            from: this.configService.get('MAIL_FROM'),
            to: userEmail,
            subject: 'Inscription',
            html: '<h3>Confirmation of inscription</h3>',
        });
    }

    async sendResetPassword(userEmail: string, url: string, code: string) {
        (await this.transporter()).sendMail({
            from: this.configService.get('MAIL_FROM'),
            to: userEmail,
            subject: 'Reset Password',
            html: `
                <a href="${url}">Reset password</a>
                <p>Secret code <strong>${code}</strong></p>
                <p>Code will expire in 15 minutes</p>
            `,
        });
    }
}
