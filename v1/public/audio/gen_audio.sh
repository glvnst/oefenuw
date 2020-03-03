#!/bin/sh

TTS_PHRASES="
dat klopt
dat klopt niet
ja
nee
prima
probeer het nog eens
super
"

TTS_VOICES="
Ellen
Claire
Xander
"

usage() {
  printf '%s\n' \
    "Usage: $0" \
    "" \
    "This script renders TTS utterances to disk then bundles them together" \
    "with other sounds here. The result is a group of monolithic audio" \
    "sprite files in various formats."

  exit 0
}

warn() {
  printf '%s %s\n' "$(date '+%FT%T')" "$*" >&2
}

die() {
  warn "$*"
  exit 1
}

gen_tts_letters() {
  voice="$1"; shift
  [ -n "$voice" ] || die "gen_tts_letters voice arg required"

  printf "Generating letters for %s: " "$voice"
  for letter in a b c d e f g h i j k l m n o p q r s t u v w x y z; do
    printf "%s " "$letter"
    say -v "$voice" -o "${voice}-letter-${letter}.wav" --data-format=F32@44100 "$letter"
  done
  printf '\n'
}

gen_tts_phrases() {
  voice="$1"; shift
  [ -n "$voice" ] || die "get_tts_phrases voice arg required"

  printf "Generating phrases for %s: " "$voice"
  printf '%s' "$TTS_PHRASES" | while read -r phrase; do
    [ -n "$phrase" ] || continue
    printf '"%s" ' "$phrase"
    safe_name="$(printf '%s' "$phrase" | tr -c "A-Za-z" "_")"
    say -v "$voice" -o "${voice}-phrase-${safe_name}.wav" --data-format=F32@44100 "$phrase"
  done
  printf '\n'
}

main() {
  if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    usage
  fi
  
  warn "(re)generating tts files"
  [ -d "tts" ] && rm -r "tts"
  mkdir "tts" || die "couldn't create tts directory"
  (
    cd "tts" || die "couldn't cd to tts directory"
    for voice in $TTS_VOICES ; do
        gen_tts_letters "$voice"
        gen_tts_phrases "$voice"
    done
  )

  warn "building sprite files"
  rm -f sprites.ogg sprites.m4a sprites.mp3 sprites.ac3 sprites.json
  audiosprite -o "sprites" --format "howler" \
    tts/*.wav \
    freesound.org/*.*
}

main "$@"