
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@NgModule({
  imports: [
    /* kann leer bleiben */
  ],
  declarations: [
    /* kann leer bleiben */
  ],
  providers: [
    /* muss leer bleiben */
  ],
  exports: [
    /* kann leer bleiben */
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    }
  }
}
