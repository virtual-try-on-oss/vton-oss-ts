import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @Prop() url: string = 'https://www.friartux.com/suits-tuxedos/navy-stretch-shawl-lapel-tuxedo-separates/FT-C5450.html';

  /*safe(url: string): string | null {
    return this.domSanitizer.sanitize(SecurityContext.URL, url)
    // return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }*/

  scrape() {
    if (this.url != null) {
      lastValueFrom(this.scrapeService
        .post({url: this.url}))
        .then(scraped => {
          this.scraped$ = this.scrapeService
            .get(scraped.id);
          if (scraped.success) {
            this.scraped$.subscribe(scrapedRes => {
              if (scrapedRes.status == 'scraping') {
                setTimeout(() => {
                  console.log("Delayed for 5 seconds.");
                  this.scrape();
                }, 5000);
              }
            })
          }
        })
    }

    /*
    this.scrapeControl.valueChanges.subscribe(r => {
      console.info("scraping:", r);
    })
    */
  }

  setProfileUrl(ogImage: string): string {
    //this.dataUrlService.modelPhotoUrl$.next(ogImage);
    return ogImage;
  }

  swap(userPhotoUrl: string | null, modelPhotoUrl: string | null) {
    if (userPhotoUrl == null || modelPhotoUrl == null) return;
    //this.swap$ = this.swapService
    //  .post({user_img_url: userPhotoUrl, model_img_url: modelPhotoUrl})
  }

  fixMarkdownUrls(markdown: string): string {
    const { origin } = new URL(this.url as string);
    return markdown.replaceAll("](/", `](${origin}/`);
  }

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return '';
  }

  render() {
    debugger;
    if (this.name) {
      return (
        <div class="app-profile">
          <p>Hello! My name is {this.normalize(this.name)}. My name was passed in through a route param!</p>
        </div>
      );
    }
  }
}
