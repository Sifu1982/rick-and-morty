export interface CharacterCardStatusGender {
  status: {
    isAlive: boolean;
    isUnknown: boolean;
    isDead: boolean;
  };
  gender: {
    isFemale: boolean;
    isMale: boolean;
    isGenderless: boolean;
    isUnknownSelected: boolean;
  };
}
