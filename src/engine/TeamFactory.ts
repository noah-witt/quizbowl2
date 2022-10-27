import { School } from "./School";
import { Team, TeamList } from "./Team";

export interface schoolDescriptor {
  name: string;
  numberOfTeams: number;
}

export function TeamFactory(schools: schoolDescriptor[]): TeamList {
  const result = new TeamList([]);
  for (const school of schools) {
    const schoolObject = new School(school.name);
    for (let i = 0; i < school.numberOfTeams; i++) {
      result.push(new Team(schoolObject, i + 1));
    }
  }
  return result;
}
