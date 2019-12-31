import * as Sqrl from "squirrelly";

Sqrl.defineFilter('tweet_text', (tweet) => {
    const text = tweet.text;
    const texts = [];
    if (tweet.entities) {
        if (tweet.entities.urls) {
            tweet.entities.urls.forEach(url => {
                const indices = url.indices;
                if (texts.length === 0) {
                    texts.push(text.substring(0, indices[0]));
                }
                texts.push(`<a href="${url.expanded_url}">${url.display_url}</a>`);
            });
        }
        if (tweet.entities.media) {
            tweet.entities.media.forEach(media => {
                const indices = media.indices;
                if (texts.length === 0) {
                    texts.push(text.substring(0, indices[0]));
                }
                texts.push(`<br><a href="${media.expanded_url}"><img src="${media.media_url}"></a>`);
            });
        }
    }
    return texts.length > 0 ? texts.join(" ") : text;
});


Sqrl.defineFilter('tweet_user_name', (tweet) => {
    return tweet.user.screen_name;
});

Sqrl.defineFilter('tweet_user_profile_img', (tweet) => {
    return tweet.user.profile_image_url;
});