import { CharacterGender, CharacterStatus } from '../constants';

export interface CharactersFiltered {
  name?: string;
  status?: CharacterStatus | '';
  species?: string;
  type?: string;
  gender?: CharacterGender | '';
  page?: number;
}
