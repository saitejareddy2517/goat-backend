import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './users.schema';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Req() req: Request,       
    @Res() res: Response,    
  ): Promise<void> {
    await this.usersService.signup(signupDto, res);
  }
}
