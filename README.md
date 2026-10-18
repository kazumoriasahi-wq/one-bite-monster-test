# One Bite Monster / パクッと！ひとくちモンスター

An independent, bright one-tap snack game. Chomp sweets in the yellow timing window and let spikes pass. Three hearts, a maximum 45-second round, combos, a centered-bite bonus and instant retries.

Original Canvas/CSS art and synthesized bubble-pop music. Japanese/English UI. Local best records and sound preference under one_bite_monster_v1. Existing six game repositories are unchanged.

Playables preparation v1.1. Loads official game_api/v1 before game code. Hosted mode uses SDK cloud saves exclusively, waits for valid saved data and system language, and reports firstFrameReady/gameReady once. SDK pause stops animation, audio and input; host audio settings are authoritative. Browser fallback retains the existing save key and audio/language controls. Failed loads do not overwrite data; failed saves remain pending for retry. No official certification or seventh-game application has been completed.

Preview: `node serve.cjs` on port 4193. Checks: `node tests.cjs`, `node round-tests.cjs`, `node music-tests.cjs`, `node host-tests.cjs` (32 checks total, including 100 seeded rounds). SDK simulator: sdk-lab.html; this is a custom fixture, not the official test suite. For CSP smoke testing set BITE_CSP=1 and BITE_PORT=4194. The CSP sandbox intentionally prevents embedding its pages in the local lab; run the lab on the normal server.

Production files: index.html, style.css, host.js, engine.js, music.js, game.js. GUIDE.html contains play and device-check instructions. No package dependencies. The official SDK is the only runtime external script. Exclude mocks, lab, tests and server from submission ZIP.

Remaining after partner access: official Test Suite and actual hosted iPhone/Windows tests, lifecycle and mute tests on real devices, cloud account restoration, package metadata/assets and YouTube review. sendScore is optional and is not enabled. The first six projects are unchanged. Requirements checked 2026-10-18: https://developers.google.com/youtube/gaming/playables/certification/requirements_integration
