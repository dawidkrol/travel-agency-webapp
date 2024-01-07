import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserFirestore } from '../models/userFirestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async makeAdmin(email: string): Promise<void> {
    try {
      const userDoc = this.firestore.collection('users').doc(email);
      await userDoc.update({ isAdmin: true, isManager: false });
    } catch (error) {
      console.error('Failed to make user admin', error);
    }
  }

  async makeManager(email: string): Promise<void> {
    try {
      const userDoc = this.firestore.collection('users').doc(email);
      await userDoc.update({ isAdmin: false, isManager: true });
    } catch (error) {
      console.error('Failed to make user admin', error);
    }
  }

  async register(user: User): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      await this.firestore.collection('users').doc(user.email).set({
        username: user.username,
        email: user.email,
        isAdmin: false,
      });
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.currentUser = await this.getUserInfo();
      this.router.navigate(['/']);
      console.log(this.currentUser);
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.currentUser = null;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getUsername(): string {
    return this.currentUser?.username || '';
  }

  isManager(): boolean {
    return this.getRole() === 'manager'
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin'
  }

  getRole(): string {
    return this.currentUser?.role || '';
  }

  private async getUserInfo(): Promise<User | null> {
    const firebaseUser = await this.afAuth.currentUser;
    if (firebaseUser) {
      const userFromFirestore = await this.firestore.collection('users').doc(firebaseUser.email!).get().toPromise();
      const userData = userFromFirestore!.data() as UserFirestore;

      const user: User = {
        username: userData.username,
        email: firebaseUser.email || '',
        password: '',
        role: userData.isManager ? 'manager' : 'user',
      };

      if(userData.isAdmin)
      {
        user.role = 'admin';

      }
  
      return user;
    }
  
    return null;
  }
}
