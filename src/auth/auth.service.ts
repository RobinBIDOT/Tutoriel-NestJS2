import {ConflictException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {SignupDto} from "./Dto/signupDto";

@Injectable()
export class AuthService {
    constructor(private readonly prismaService : PrismaService) {}
    async signup(signupDto: SignupDto) {
        const {email, password, username} = signupDto
        // ** Vérifier si l'utilisateur est déjà inscrit
        const user = await this.prismaService.user.findUnique({where : { email }})
        if (user) throw new ConflictException("User already exists")
        // ** Hasher le mot de passe
        // ** Enregistrer l'utilisateur dans la base de données
        // ** Envoyer un email de confirmation
        // ** Retourner une réponse de succès
    }
}
