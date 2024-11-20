package soundscape

import (
	"math/rand"
	"time"
)

type Soundscape struct {
	Sounds      []SoundType
	CurrentMood MoodType
	Intensity   float64
}

func NewSoundscape() *Soundscape {
	return &Soundscape{
		Sounds:      []SoundType{},
		CurrentMood: NeutralMood,
		Intensity:   0.5,
	}
}

func (s *Soundscape) GenerateCustomSoundtrack() []SoundType {
	rand.Seed(time.Now().UnixNano())

	sounds := guessMoodSounds(s.CurrentMood)

	// Randomize sound selection based on intensity
	numSounds := int(s.Intensity * float64(len(sounds)))
	if numSounds < 1 {
		numSounds = 1
	}

	// Shuffle and select sounds
	rand.Shuffle(len(sounds), func(i, j int) {
		sounds[i], sounds[j] = sounds[j], sounds[i]
	})

	return sounds[:numSounds]
}

func (s *Soundscape) SetMood(mood MoodType, intensity float64) {
	s.CurrentMood = mood
	s.Intensity = intensity
}
