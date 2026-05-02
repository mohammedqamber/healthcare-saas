import { Patient } from "@/types";
import {
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Calendar,
  Stethoscope,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="group rounded-xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary shrink-0">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold truncate">{patient.name}</h3>
          <p className="text-xs text-muted-foreground">
            {patient.age} yrs &bull; {patient.gender}
          </p>
        </div>
        <StatusBadge status={patient.status} />
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs">
          <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">{patient.condition}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">{patient.doctor}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground truncate">
            {patient.email}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">{patient.phone}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 rounded-lg bg-muted p-2.5">
        <div className="text-center">
          <Heart className="mx-auto h-3.5 w-3.5 text-red-400 mb-0.5" />
          <p className="text-[10px] font-medium">{patient.vitalSigns.hr}</p>
          <p className="text-[9px] text-muted-foreground">BPM</p>
        </div>
        <div className="text-center">
          <Wind className="mx-auto h-3.5 w-3.5 text-blue-400 mb-0.5" />
          <p className="text-[10px] font-medium">{patient.vitalSigns.spo2}</p>
          <p className="text-[9px] text-muted-foreground">SpO2%</p>
        </div>
        <div className="text-center">
          <Thermometer className="mx-auto h-3.5 w-3.5 text-amber-400 mb-0.5" />
          <p className="text-[10px] font-medium">
            {patient.vitalSigns.temp}&deg;
          </p>
          <p className="text-[9px] text-muted-foreground">Temp</p>
        </div>
        <div className="text-center">
          <Droplets className="mx-auto h-3.5 w-3.5 text-purple-400 mb-0.5" />
          <p className="text-[10px] font-medium">{patient.bloodType}</p>
          <p className="text-[9px] text-muted-foreground">Blood</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        Next: {patient.nextAppointment}
      </div>
    </div>
  );
}
