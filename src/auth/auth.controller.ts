import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { SignupDto } from './Dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './Dto/signinDto';
import { ResetPasswordDemandDto } from './Dto/resetPasswordDemandDto';
import { ResetPasswordConfirmationDto } from './Dto/resetPasswordConfirmationDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Post('reset-password')
    resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
        return this.authService.resetPasswordDemand(resetPasswordDemandDto);
    }

    @Post('reset-password-confirmation')
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        return this.authService.resetPasswordConfirmation(resetPasswordConfirmationDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    deleteAccount() {
        return 'account deleted';
    }
}
