package audio

import (
	"os"
	"time"

	"github.com/faiface/beep"
	"github.com/faiface/beep/mp3"
	"github.com/faiface/beep/speaker"
)

type SoundMixer struct {
	sounds []beep.Streamer
}

func NewSoundMixer() *SoundMixer {
	return &SoundMixer{
		sounds: []beep.Streamer{},
	}
}

func (m *SoundMixer) LoadSound(filename string) error {
	f, err := os.Open(filename)
	if err != nil {
		return err
	}

	streamer, format, err := mp3.Decode(f)
	if err != nil {
		return err
	}

	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/10))

	m.sounds = append(m.sounds, streamer)
	return nil
}

func (m *SoundMixer) Play() {
	mixer := beep.Mixer{}
	for _, sound := range m.sounds {
		mixer.Add(sound)
	}
	speaker.Play(&mixer)
}
