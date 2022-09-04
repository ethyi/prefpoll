# Prefpoll
A preference based voting webapp.

![Selection_014](https://user-images.githubusercontent.com/37843741/188291387-7836c35e-7a64-4b9b-9963-610f6a8b2fa0.png)

Took inspiration from the simple UI of strawpoll (RIP).

Made with JS (EJS,express), Rust(actix_web,sqlx), and postgresql.

I was going to publish this online but it costs too much and I haven't secured the API.
I've pivoted career paths so I'm putting this on hold.

## Road to deployment
1. Rate limit api calls
2. Limit options
3. IP and Cookie duplication check
4. Google Ads to fund it (?)

## Additional features
1. Frontend typescript, React, with SSR refactor
2. Make the dragging look nicer
3. Maybe turn into full Rust app with Yew?
4. Voting percentages (more complicated than you think)
5. Option to chose voting algorithm (RCV, borda count, ... like 20 others, look at wiki)
