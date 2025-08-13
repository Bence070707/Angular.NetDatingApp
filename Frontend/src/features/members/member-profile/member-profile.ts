import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
    selector: 'app-member-profile',
    imports: [DatePipe, FormsModule],
    templateUrl: './member-profile.html',
    styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit, OnDestroy {
    @HostListener('window:beforeunload', ['$event']) notify(event: BeforeUnloadEvent) {
        if (this.editForm?.dirty) {
            event.preventDefault();
        }
    }
    @ViewChild('editForm') editForm?: NgForm;
    private accountService = inject(AccountService);
    private toastService = inject(ToastService);
    protected memberService = inject(MemberService);
    protected editableMember: EditableMember = {
        displayName: '',
        description: '',
        city: '',
        country: ''
    }

    ngOnInit(): void {
        this.editableMember = {
            displayName: this.memberService.member()?.displayName || '',
            description: this.memberService.member()?.description || '',
            city: this.memberService.member()?.city || '',
            country: this.memberService.member()?.country || ''
        };
    }

    ngOnDestroy(): void {
        if (this.memberService.editMode()) {
            this.memberService.editMode.set(false);
        }
    }

    updateProfile() {
        if (!this.memberService.member()) return;

        const updatedMember = { ...this.memberService.member(), ...this.editableMember } as Member;
        this.memberService.updateMember(updatedMember).subscribe({
            next: () => {
                const currentUser = this.accountService.currentUser();
                if(currentUser && updatedMember.displayName != currentUser?.displayName){
                    currentUser.displayName = updatedMember.displayName;
                    this.accountService.setCurrentUser(currentUser);
                }
                this.toastService.success(['Profile updated successfully']);
                this.memberService.editMode.set(false);
                this.memberService.member.set(updatedMember);
                this.editForm?.reset(updatedMember);
            },
            error: () => {
                this.toastService.error(['Failed to update profile']);
            }
        });
        console.log(updatedMember);
    }
}
