export type User = {
  username: string;
  id: number;
  firstname: string;
  fullname: string;
  phone: string;
  email: string;
  isTeacher: boolean;
  teacher_id: number;
  teacher_profile: string;
  host?: "https://idioma.kongoriver.org";
  isActive?: boolean;
};
