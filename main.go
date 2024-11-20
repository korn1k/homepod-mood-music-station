package main

import (
	"fmt"
	"homepod-soundscape/audio"
	"homepod-soundscape/homekit"
	"homepod-soundscape/soundscape"
	"log"
)

func main() {
	generator := soundscape.NewSoundscape()
	generator.SetMood(soundscape.NeutralMood, 0.7)

	// Create Sound Mixer
	mixer := audio.NewSoundMixer()

	// Generate Soundtrack
	selectedSounds := generator.GenerateCustomSoundtrack()
	fmt.Println("Selected Sounds:", selectedSounds)

	for _, sound := range selectedSounds {
		file := soundscape.GetFilePathToMoodSound(sound)
		err := mixer.LoadSound(file)
		if err != nil {
			log.Printf("Error loading sound %s: %v", file, err)
		}
	}

	// Play Sounds
	mixer.Play()

	// HomeKit Integration
	homekit, err := homekit.NewSoundscapeController()
	if err != nil {
		log.Fatalf("Failed to create HomeKit controller: %v", err)
	}

	// Start HomeKit Bridge
	go func() {
		if err := homekit.Start(); err != nil {
			log.Fatalf("HomeKit bridge failed: %v", err)
		}
	}()

	// Keep application running
	select {}
}
