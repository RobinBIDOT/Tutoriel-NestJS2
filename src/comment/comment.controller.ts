import {Controller, Post, Put, Delete, Body, Param, Req, UseGuards, ParseIntPipe} from '@nestjs/common';
import { Request } from "express"
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/createCommentDto";
import {AuthGuard} from "@nestjs/passport";

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService : CommentService ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    create(@Req() request : Request, @Body() createCommentDto : CreateCommentDto) {
        const userId = request.user["userId"]
        return this.commentService.create(userId, createCommentDto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete/:id")
    delete(@Req() request : Request, @Param("id", ParseIntPipe) commentId : number, @Body("postId") postId : number ) {
        const userId = request.user["userId"]
        return this.commentService.delete(commentId, userId, postId)
    }
}
