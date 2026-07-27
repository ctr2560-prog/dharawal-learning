ANIMAL SOUNDS — audio files needed for the "Animal Sounds" game
================================================================

Drop MP3 files into this folder using these EXACT filenames. The game reads
them by name. You need at least 4 for the game to be playable; add all 11 for
the full set.

  bird.mp3        bird       -> budjaan
  dingo.mp3       dingo      -> warrigal
  echidna.mp3     echidna    -> gunninggwirr
  emu.mp3         emu        -> biraban
  fly.mp3         fly        -> mirang
  kangaroo.mp3    kangaroo   -> buru
  koala.mp3       koala      -> kooala
  lyrebird.mp3    lyrebird   -> kalboonya
  mouse.mp3       mouse      -> bugalaa
  possum.mp3      possum     -> guruwara
  snake.mp3       snake      -> garri

Recommended: 3-6 seconds each, clearly the animal on its own (no narration,
no music). Reload the page after adding files.

WHERE TO GET RECORDINGS
-----------------------
Check the licence before using anything in a school resource. Look for
Creative Commons or public domain.

  * Australian Museum        australian.museum  (many native species, with
                             sound clips on individual animal pages)
  * ABC Science / Gould League Australian wildlife audio
  * Macaulay Library         macaulaylibrary.org  (Cornell — huge bird
                             archive incl. lyrebird, emu; check each licence)
  * Freesound                freesound.org  (filter by CC0 licence)
  * Wikimedia Commons        commons.wikimedia.org

The lyrebird (kalboonya) is worth choosing carefully — a clip where it mimics
other birds or human-made sounds connects directly to the Nura Kalboonya
material already in the app.

ADDING OR REMOVING ANIMALS
--------------------------
Edit src/data/animalSounds.js. Only animals that already exist in
src/data/vocabulary.js under the "animals" category can be used — the app
checks this and will skip (with a console warning) anything that isn't in the
knowledge base.
