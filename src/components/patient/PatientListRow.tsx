import { Patient } from "@/types";
import { StatusBadge } from "./StatusBadge";

export function PatientListRow({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 hover:shadow-sm hover:border-primary/30 transition-all">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary shrink-0">
        {patient.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{patient.name}</h3>
          <StatusBadge status={patient.status} />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {patient.age} yrs &bull; {patient.gender} &bull; {patient.condition}
        </p>
      </div>

      <div className="hidden md:grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-[10px] text-muted-foreground">BP</p>
          <p className="text-xs font-medium">{patient.vitalSigns.bp}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">HR</p>
          <p className="text-xs font-medium">{patient.vitalSigns.hr}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">SpO2</p>
          <p className="text-xs font-medium">{patient.vitalSigns.spo2}%</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Blood</p>
          <p className="text-xs font-medium">{patient.bloodType}</p>
        </div>
      </div>

      <div className="hidden lg:block text-right min-w-[120px]">
        <p className="text-[10px] text-muted-foreground">
          Next Appointment
        </p>
        <p className="text-xs font-medium">{patient.nextAppointment}</p>
      </div>

      <div className="hidden sm:block text-right min-w-[100px]">
        <p className="text-[10px] text-muted-foreground">Doctor</p>
        <p className="text-xs font-medium truncate">{patient.doctor}</p>
      </div>
    </div>
  );
}
