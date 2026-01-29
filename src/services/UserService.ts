import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.ts";

type UserDTO = Pick<User, "firstName" | "lastName" | "email">;

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async create(user: UserDTO): Promise<User> {
        return this.userRepository.save(user);
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async update(id: number, user: UserDTO): Promise<UserDTO | null> {
        const updatedUser = await this.userRepository.update(id, user);
        return updatedUser.affected ? user : null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected ? true : false;
    }
}

export const userService = new UserService();