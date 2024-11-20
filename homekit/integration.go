package homekit

import (
	"github.com/brutella/hc"
	"github.com/brutella/hc/accessory"
)

type SoundscapeController struct {
	transport hc.Transport
}

func NewSoundscapeController() (*SoundscapeController, error) {
	info := accessory.Info{
		Name:         "Soundscape Generator",
		SerialNumber: "12345",
		Manufacturer: "GoHome",
	}

	// Create a switch accessory
	acc := accessory.NewSwitch(info)

	// Create a HomeKit configuration
	config := hc.Config{
		Pin: "123-45-678",
	}

	// Create a new transport with the switch accessory
	transport, err := hc.NewIPTransport(config, acc.Accessory)
	if err != nil {
		return nil, err
	}

	return &SoundscapeController{
		transport: transport,
	}, nil
}

func (sc *SoundscapeController) Start() error {
	// Start the HomeKit transport
	go sc.transport.Start()

	return nil
}
