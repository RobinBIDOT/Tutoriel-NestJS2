import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "@nestjs/passport";
import {CreatePostDto} from "./dto/createPostDto";
import {Request} from "express";

@Controller('posts')
export class PostController {
    constructor(private readonly postService : PostService) {}

    @Get()
    getAll() {
        return this.postService.getAll()
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    create(@Body() createPostDto : CreatePostDto, @Req() request : Request) {
        const userId = request.user["userId"]
        return this.postService.create(createPostDto, userId)
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("delete/:id")
    delete(@Param("id", ParseIntPipe) postId : number, createPostDto : CreatePostDto, @Req() request : Request) {
        const userId = request.user["userId"]
        return this.postService.delete(postId, userId)
    }
}
