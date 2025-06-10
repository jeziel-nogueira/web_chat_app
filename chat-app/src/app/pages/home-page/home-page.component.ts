import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SettingsComponent } from "../../components/settings/settings.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { UserFriendsComponent } from "../../components/user-friends/user-friends.component";
import { UserGroupsComponent } from "../../components/user-groups/user-groups.component";
import { UserFriendMessagesComponent } from "../../components/user-friend-messages/user-friend-messages.component";
import { UserGroupMessagesComponent } from "../../components/user-group-messages/user-group-messages.component";

@Component({
  selector: 'app-home-page',
  imports: [
    MatIcon,
    CommonModule,
    SettingsComponent,
    ProfileComponent,
    UserFriendsComponent,
    UserGroupsComponent,
    UserFriendMessagesComponent,
    UserGroupMessagesComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  selectedSection: string = 'chats';
  selectedItem: any = null;

  selectSection(section: string) {
    this.selectedSection = section;
    this.selectedItem = null;
  }

  openItem(item: any) {
    this.selectedItem = item;
  }
}
