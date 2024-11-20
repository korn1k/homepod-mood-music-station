package soundscape

type SoundType string

const (
	RainSound      SoundType = "rain"
	ForestSound    SoundType = "forest"
	OceanSound     SoundType = "ocean"
	CafeSound      SoundType = "cafe"
	FireplaceSound SoundType = "fireplace"
)

func guessMoodSounds(mood MoodType) []SoundType {
	switch mood {
	case RelaxedMood:
		return []SoundType{RainSound, ForestSound, OceanSound}
	case FocusedMood:
		return []SoundType{CafeSound, RainSound}
	case EnergeticMood:
		return []SoundType{FireplaceSound}
	case NeutralMood:
		return []SoundType{RainSound, ForestSound, CafeSound}
	default:
		return []SoundType{RainSound}
	}
}

func GetFilePathToMoodSound(sound SoundType) string {
	switch sound {
	case RainSound:
		return "/sounds/rain.mp3"
	case ForestSound:
		return "/sounds/forest.mp3"
	case OceanSound:
		return "/sounds/ocean.mp3"
	case CafeSound:
		return "/sounds/cafe.mp3"
	case FireplaceSound:
		return "/sounds/fireplace.mp3"
	default:
		return "/sounds/rain.mp3"
	}
}
