import { async, inject, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { EmbedVideoService } from '../src/embed-video.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmbedVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EmbedVideoService]
    });
  });

  it('is defined', inject([EmbedVideoService], embedVideoService => {
    expect(embedVideoService).toBeDefined();
  }));

  it('converts vimeo.com url', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(embedVideoService.embed('http://vimeo.com/19339941')).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://player.vimeo.com/video/19339941" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('converts facebook url with ?v param', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed(
          'https://www.facebook.com/watch/?v=1545802115475031'
        )
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F1545802115475031"></iframe>'
        )
      );
    }
  ));

  it('converts facebook url with normal videos path', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed(
          'https://www.facebook.com/MercedesBenz/videos/10155716373856670/'
        )
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10155716373856670"></iframe>'
        )
      );
    }
  ));

  it('converts youtube.com url', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed('https://www.youtube.com/watch?v=twE64AuqE9A')
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.youtube.com/embed/twE64AuqE9A" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('converts youtu.be url', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed('http://youtu.be/9XeNNqeHVDw#aid=P-Do3JLm4A0')
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('converts dailymotion.com url', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed(
          'https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport'
        )
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('converts dai.ly url', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(embedVideoService.embed('http://dai.ly/x20qnej')).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('converts vimeo id', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(embedVideoService.embed_vimeo('19339941')).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://player.vimeo.com/video/19339941" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('converts facebook id', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(embedVideoService.embed_facebook('1545802115475031')).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F1545802115475031"></iframe>'
        )
      );
    }
  ));

  it('converts youtube id', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(embedVideoService.embed_youtube('9XeNNqeHVDw')).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('accepts query param facebook', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed_facebook('1545802115475031', {
          query: { rel: 0, showinfo: 0 }
        })
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F1545802115475031?rel=0&showinfo=0&show_text=false" style="border:none;overflow:hidden;" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>'
        )
      );
    }
  ));

  it('accepts attributes facebook', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed_facebook('1545802115475031', {
          query: { rel: 0, showinfo: 0, width: 500, height: 280 },
          attr: { allow: 'autoplay; encrypted-media' }
        })
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F1545802115475031?rel=0&showinfo=0&width=500&height=280&show_text=false" allow="encrypted-media" style="border:none;overflow:hidden;" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>'
        )
      );
    }
  ));

  it('accepts query param youtube', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed_youtube('9XeNNqeHVDw', {
          query: { rel: 0, showinfo: 0 }
        })
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw?rel=0&showinfo=0" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('removes height and width query params youtube', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed_youtube('9XeNNqeHVDw', {
          query: { rel: 0, showinfo: 0, width: 500, height: 500 },
          attr: { width: 400, height: 200 }
        })
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw?rel=0&showinfo=0" width="400" height="200" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));

  it('accepts attributes youtube', inject(
    [EmbedVideoService, DomSanitizer],
    (embedVideoService, sanitizer) => {
      expect(
        embedVideoService.embed_youtube('9XeNNqeHVDw', {
          query: { rel: 0, showinfo: 0 },
          attr: { width: 400, height: 200 }
        })
      ).toEqual(
        sanitizer.bypassSecurityTrustHtml(
          '<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw?rel=0&showinfo=0" width="400" height="200" frameborder="0" allowfullscreen></iframe>'
        )
      );
    }
  ));
});
