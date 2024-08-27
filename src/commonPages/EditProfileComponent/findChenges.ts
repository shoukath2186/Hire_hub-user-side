import { UserProfile } from '../../datatypes.ts/IJobProfile';

export default function ChechChenges(orgProfile: UserProfile | null, editProfile: UserProfile | null): Partial<UserProfile> {
  if (!orgProfile || !editProfile) {
    return {};
  }

  const changedFields: Partial<UserProfile> = {};


  if (orgProfile.bio.trim() !== editProfile.bio.trim()) {
    changedFields.bio = editProfile.bio.trim();
  }

  if (orgProfile.location.trim() !== editProfile.location.trim()) {
    changedFields.location = editProfile.location.trim();
  }

  if (orgProfile.website.trim() !== editProfile.website.trim()) {
    changedFields.website = editProfile.website.trim();
  }

  if (JSON.stringify(orgProfile.skills.map(skill => skill.trim())) !== JSON.stringify(editProfile.skills.map(skill => skill.trim()))) {
    changedFields.skills = editProfile.skills.map(skill => skill.trim());
  }

  if (
    orgProfile.socialLinks.github.trim() !== editProfile.socialLinks.github.trim() ||
    orgProfile.socialLinks.linkedin.trim() !== editProfile.socialLinks.linkedin.trim() ||
    orgProfile.socialLinks.twitter.trim() !== editProfile.socialLinks.twitter.trim()
  ) {
    changedFields.socialLinks = {
      github: editProfile.socialLinks.github.trim(),
      linkedin: editProfile.socialLinks.linkedin.trim(),
      twitter: editProfile.socialLinks.twitter.trim()
    };
  }

  if (JSON.stringify(orgProfile.experience.map(exp => ({ ...exp, role: exp.role.trim(), company: exp.company.trim(), duration: exp.duration.trim(), description: exp.description.trim() }))) !== JSON.stringify(editProfile.experience.map(exp => ({ ...exp, role: exp.role.trim(), company: exp.company.trim(), duration: exp.duration.trim(), description: exp.description.trim() })))) {
    changedFields.experience = editProfile.experience.map(exp => ({ ...exp, role: exp.role.trim(), company: exp.company.trim(), duration: exp.duration.trim(), description: exp.description.trim() }));
  }

  if (JSON.stringify(orgProfile.education.map(edu => ({ ...edu, degree: edu.degree.trim(), institution: edu.institution.trim(), year: edu.year.trim() }))) !== JSON.stringify(editProfile.education.map(edu => ({ ...edu, degree: edu.degree.trim(), institution: edu.institution.trim(), year: edu.year.trim() })))) {
    changedFields.education = editProfile.education.map(edu => ({ ...edu, degree: edu.degree.trim(), institution: edu.institution.trim(), year: edu.year.trim() }));
  }

  if (JSON.stringify(orgProfile.hobbies.map(hobby => hobby.trim())) !== JSON.stringify(editProfile.hobbies.map(hobby => hobby.trim()))) {
    changedFields.hobbies = editProfile.hobbies.map(hobby => hobby.trim());
  }

  if (orgProfile.resume !== editProfile.resume) {
    changedFields.resume = editProfile.resume;
  }

  return changedFields;
}