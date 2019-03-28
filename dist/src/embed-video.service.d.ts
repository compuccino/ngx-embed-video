import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'url-polyfill';
export declare class EmbedVideoService {
    private http;
    private sanitizer;
    private validYouTubeOptions;
    private validVimeoOptions;
    private validDailyMotionOptions;
    constructor(http: HttpClient, sanitizer: DomSanitizer);
    embed(url: any, options?: any): any;
    embed_facebook(id: string, options?: any): string;
    embed_youtube(id: string, options?: any): string;
    embed_vimeo(id: string, options?: any): string;
    embed_dailymotion(id: string, options?: any): string;
    embed_image(url: any, options?: any): any;
    private embed_youtube_image;
    private embed_vimeo_image;
    private embed_dailymotion_image;
    private parseOptions;
    private serializeQuery;
    private sanitize_iframe;
    private detectVimeo;
    private detectFacebook;
    private detectYoutube;
    private detectDailymotion;
}
