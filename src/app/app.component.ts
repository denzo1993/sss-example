import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  UserService,
  IUser,
  GroupService,
  IGroup,
  WorkspaceService,
  IWorkspace,
  ConfigService,
  IConfig,
  CollectionService,
  CollectionListService,
  ICollection,
  NotificationService,
  IEmailNotification
} from 'sss-core-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private readonly testUsername = 'User2083'; // Public account for testing
  private readonly testPassword = '123456';
  private readonly emailReceiver = ''; // Write email here to receive message

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private groupService: GroupService,
    private workspaceService: WorkspaceService,
    private configService: ConfigService,
    private collectionService: CollectionService,
    private collectionListService: CollectionListService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {

    /**
     * If you want to get full access (CREATE, UPDATE, GET, DELETE)
     * write denzo1993@gmail.com
     */

    // Example 1. Get access token. It automatically save in service.
    this.authService.login(this.testUsername, this.testPassword).subscribe(() => {

      // Example 2. Get Workspace
      this.workspaceService.get().subscribe((workspace: IWorkspace) => {
        console.log('workspace');
        console.log(workspace);
      });

      // Example 3. Get Group list
      this.groupService.get().subscribe((groups: IGroup[]) => {
        console.log('groups');
        console.log(groups);
      });

      // Example 4. Get User list
      this.userService.get().subscribe((users: IUser[]) => {
        console.log('users');
        console.log(users);
      });

      // Example 5. Get workspace configuration
      this.configService.get().subscribe((config: IConfig) => {
        console.log('config');
        console.log(config);
      });

      /**
       * You can create own collection with unique object structure.
       *
       * Example 6. Create collection example:
       */
      this.collectionService.put<ICollection>({ name: 'cars' })
        .subscribe((collection: ICollection) => {
          console.log(`Collection '${collection.name}' successfully created!`);

          // Example 7. Add item in your collection
          this.collectionListService.put<ICar>({
            model: 'Bentley',
            color: 'black'
          }, collection.name).subscribe(() => {

            // Example 8. Get list of item in your collection
            this.collectionListService.get(collection.name)
              .subscribe((cars: ICar[]) => {
                console.log(`Collection '${collection.name}' has ${cars.length} items:`);
                console.log(cars);
              });
          });
        });

      /**
       * Example 9.
       *
       * You can send email via Sss-core.
       * A test mailbox is used to send messages from sandbox.
       */
      this.notificationService.sendMail({
        from: 'smart-site-system@yandex.ru',
        to: this.emailReceiver,
        subject: 'Sss-core notification test',
        text: 'Hello, we are testing notifications!',
      }).subscribe((result: IEmailNotification) => {
        console.log(`Email sent. Info: ${result.response}`);
      });

      // Example 10. Upload/download files.
      // Use upload and download methods in MediaService.
    });
  }
}

interface ICar {
  model: string;
  color: string;
}
