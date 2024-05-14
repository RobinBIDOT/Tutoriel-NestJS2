import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {SignupDto} from "./Dto/signupDto";
import * as bcrypt from "bcrypt"
import {MailerService} from "../mailer/mailer.service";
import {SigninDto} from "./Dto/signinDto";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private readonly prismaService : PrismaService,
                private readonly mailerService : MailerService,
                private readonly JwtService : JwtService,
                private readonly configService : ConfigService,
    ) {}
    async signup(signupDto: SignupDto) {
        const {email, password, username} = signupDto
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.prismaService.user.findUnique({where : { email }})
        if (user) throw new ConflictException("User already exists")
        // ** Hasher le mot de passe
        const hash = await bcrypt.hash(password, 10)
        // ** Enregistrer l'utilisateur dans la base de données
        await this.prismaService.user.create({data : {email, username, password : hash}})
        // ** Envoyer un email de confirmation
        await this.mailerService.sendSignupConfirmation(email)
        // ** Retourner une réponse de succès
        return { data : "User succesfully created"}
    }

    async signin(signinDto: SigninDto) {
        const {email, password} = signinDto
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.prismaService.user.findUnique({where:{email}})
        if (!user) throw new NotFoundException("User not found")
        // ** Comparer le mot de passe
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new UnauthorizedException("Password does not match")
        // ** Retourner un token jwt
        const payload = {
            sub : user.userId,
            email : user.email,
        }
        const token = this.JwtService.sign(payload, {expiresIn : "2h", secret : this.configService.get("SECRET_KEY") })
        return {
            token, user : {
                username : user.username,
                email : user.email,
            },
        };
    }
}
