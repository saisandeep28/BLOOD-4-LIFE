declare module '@life-for-all/types' {
  export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    DONOR = 'donor',
    RECIPIENT = 'recipient',
    HOSPITAL = 'hospital',
    BLOOD_BANK = 'blood_bank',
    VOLUNTEER = 'volunteer',
    NGO = 'ngo',
    GOVERNMENT = 'government',
  }
  export enum BloodGroup {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
  }
  export enum ComponentType {
    WHOLE_BLOOD = 'whole_blood',
    PLASMA = 'plasma',
    PLATELETS = 'platelets',
    RBC = 'rbc',
    CRYOPRECIPITATE = 'cryoprecipitate',
  }
  export enum UrgencyLevel {
    CRITICAL = 'critical',
    URGENT = 'urgent',
    PLANNED = 'planned',
  }
  export enum RequestStatus {
    SUBMITTED = 'submitted',
    MATCHING = 'matching',
    DONORS_CONFIRMED = 'donors_confirmed',
    IN_PROGRESS = 'in_progress',
    FULFILLED = 'fulfilled',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
  }
  export enum BloodUnitStatus {
    AVAILABLE = 'available',
    RESERVED = 'reserved',
    ISSUED = 'issued',
    DISCARDED = 'discarded',
    TRANSFERRED = 'transferred',
    EXPIRED = 'expired',
  }
  export enum AppointmentStatus {
    SCHEDULED = 'scheduled',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    NO_SHOW = 'no_show',
  }
  export enum VerificationStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    SUSPENDED = 'suspended',
  }
  export enum NotificationType {
    EMERGENCY_REQUEST = 'emergency_request',
    REQUEST_MATCH = 'request_match',
    APPOINTMENT_REMINDER = 'appointment_reminder',
    STOCK_ALERT = 'stock_alert',
    EXPIRY_ALERT = 'expiry_alert',
    VERIFICATION_UPDATE = 'verification_update',
    DONATION_COMPLETE = 'donation_complete',
    REWARD_MILESTONE = 'reward_milestone',
    SYSTEM_ALERT = 'system_alert',
    BROADCAST = 'broadcast',
  }
  export enum NotificationChannel {
    EMAIL = 'email',
    SMS = 'sms',
    PUSH = 'push',
    WHATSAPP = 'whatsapp',
    IN_APP = 'in_app',
  }
  export enum NotificationStatus {
    PENDING = 'pending',
    SENT = 'sent',
    DELIVERED = 'delivered',
    READ = 'read',
    FAILED = 'failed',
  }
  export enum VolunteerTaskStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    EN_ROUTE = 'en_route',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
  }
  export enum BadgeTier {
    BRONZE = 'bronze',
    SILVER = 'silver',
    GOLD = 'gold',
    PLATINUM = 'platinum',
    LIFESAVER = 'lifesaver',
  }
  export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
    PREFER_NOT_TO_SAY = 'prefer_not_to_say',
  }
}
