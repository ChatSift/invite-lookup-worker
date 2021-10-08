<div align="center">
  <p align="center">
    <br />
    <h3>
      <strong>
        CloudFlare Worker for looking up Discord invites
      </strong>
    </h2>
  </p>

  <br>
</div>

# But why?

Auto moderation of Discord invites is infamously obnoxious to deal with. The rate limit on its own isn't particularly bad and I actually find it difficult to hit, the issue is that 10k 4xx requests to Discord will lead to a 1 hour CloudFlare ban. Despite the docs not mentioning it, this includes 404s.

Effectively, this means that if you need to check if something is a valid invite, you could webscrape the discord.gg page (or other hacky approaches), or implement a cache-heavy approach and pray that you do not hit enough 404s.

Luckily enough, CF Workers seems to use *1* external IP (or a very small amount regardless), and Discord doesn't appear to be particularly enforcing the 10k invalid requests ban as they normally would be.

# LICENSING

This repository is licensed under the GNU AGPLv3 license.
