import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { instance } from "./AxiosInstance";

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
  floordata: any;
  setFloor: (_: any) => void;
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
}

export const FloorContext = createContext({} as FloorContextType);
const FloorProvider = ({ children }: any) => {
  const [floordata, setFloor] = useState([] as any);
  const [floors, setFloors] = useState([] as any);
  const [rooms, setRooms] = useState([] as any);
  const [patients, setPatients] = useState([] as any);
  const [medicalHistorys, setMedicalHistorys] = useState([] as any);
  const [infusionHistorys, setInfusionHistorys] = useState([] as any);
  //   if (isrevalidate) {
  //   } else {
  //     setIsrevalidate(true);
  //     setInterval(() => {
  //       console.log(Date.now() - count);

  //       if (Date.now() - count >= 12000) {
  //         const databro = Promise.all(
  //           floor.map(({ id }: { id: number }) => {
  //             return instance.get("/floors/" + id.toString()).then((res2) => {
  //               return res2.data.data;
  //             });
  //           })
  //         );
  //         setFloors(databro);
  //         setCount(Date.now());
  //         console.log("reset");
  //       }
  //     }, 1000);
  //   }
  // };

  return (
    <FloorContext.Provider
      value={{
        floordata,
        setFloor,
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
