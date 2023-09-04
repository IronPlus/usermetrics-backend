import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { Dashboard } from './dashboard.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('/usermetrics-v1')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  /**
   * Returns array of dashboards.
   *
   * @returns array of dashboards.
   */
  @Get('/dashboards')
  @UseGuards(AuthGuard('basic'))
  getDashboards(): Promise<Dashboard[]> {
    return this.dashboardsService.getDashboards();
  }
}
