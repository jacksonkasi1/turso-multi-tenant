import { Request, Response } from 'express';
import { OrganizationService } from '../../services/organization_service';
import { CreateOrganizationDto, OrganizationIdDto } from '../validators/organization_validator';

export class OrganizationController {
  private service: OrganizationService;

  constructor() {
    this.service = new OrganizationService();
  }

  async create(req: Request<{}, {}, CreateOrganizationDto>, res: Response) {
    const organization = await this.service.createOrganization(req.body.name);
    res.status(201).json(organization);
  }

  async get(req: Request<OrganizationIdDto>, res: Response) {
    const organization = await this.service.getOrganization(req.params.id);
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    res.json(organization);
  }

  async list(_req: Request, res: Response) {
    const organizations = await this.service.listOrganizations();
    res.json(organizations);
  }
} 