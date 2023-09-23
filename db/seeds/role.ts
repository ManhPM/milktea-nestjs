import { Factory, Seeder } from 'typeorm-seeding';

import { Role } from 'src/roles/entities/role.entity';

export class CreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const roles = [
      { id: 1, roleName: 'Amitav Roy' },
      { id: 2, roleName: 'Role 2' },
    ];
    await Promise.all(
      roles.map(async (role) => {
        await factory(Role)().create(role);
      }),
    );
  }
}
