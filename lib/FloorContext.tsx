import { createContext, ReactNode, useContext, useState } from "react";

interface infusionHistory {
  createdDate: Date;
  dropRate: number;
  id: number;
  isCompleted: boolean;
  nurse: string;
  patientId: number;
  updatedDate: Date;
}
interface medicalHostoryType {
  createdDate: Date;
  deletedDate: Date;
  doctor: string;
  id: number;
  medicalHistory: string;
  patientId: number;
  updatedDate: Date;
}
interface addressType {
  id: number;
  province: string;
  district: string;
  subDistrict: string;
  zipCode: string;
}
export interface PatientType {
  address: addressType;
  addressId: number;
  birthDate: Date;
  emergencyPhoneNumber: string;
  firstname: string;
  id: number;
  isCheckout: boolean;
  lastname: string;
  phoneNumber: string;
  roomId: number;

  medicalHostory: medicalHostoryType[];
  infusionHistory: infusionHistory[];
}
interface RoomType {
  id: number;
  floorId: number;
  isTrigger: boolean;
  name: string;
  patient: PatientType;
}

interface FloorContextType {
  floors: any;
  setFloors: (_: any) => void;
  rooms: any;
  setRooms: (_: any) => void;
  patients: any;
  setPatients: (_: any) => void;
  medicalHistorys: any;
  setMedicalHistorys: (_: any) => void;
  infusionHistorys: any;
  setInfusionHistorys: (_: any) => void;
  revalidate: () => void;
}

export const FloorContext = createContext({} as FloorContextType);
const FloorProvider = ({ children }: any) => {
  const [floors, setFloors] = useState([] as any);
  const [rooms, setRooms] = useState([] as any);
  const [patients, setPatients] = useState([] as any);
  const [medicalHistorys, setMedicalHistorys] = useState([] as any);
  const [infusionHistorys, setInfusionHistorys] = useState([] as any);
  const [count, setCount] = useState(1200);
  const revalidate = setInterval(() => {
    if (count === 0) {
    }
    setCount(count - 1);
  }, 1);
  return (
    <FloorContext.Provider
      value={{
        floors,
        setFloors,
        rooms,
        setRooms,
        patients,
        setPatients,
        medicalHistorys,
        setMedicalHistorys,
        infusionHistorys,
        setInfusionHistorys,
      }}
    >
      {children}
    </FloorContext.Provider>
  );
};

export default FloorProvider;
