export interface NamedEntity {
  name: string;
}

export interface VacancyList {
  id: number;
  main_technologies: NamedEntity[];
  more_technologies: NamedEntity[];
  name: string;
  slug: string;
}

export interface CurrentVacancyInfo extends VacancyList {
  min_requirements: NamedEntity[];
  tasks: NamedEntity[];
  list_offer: NamedEntity[];
  salary: string;
  is_active: boolean;
}
