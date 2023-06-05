import {DocumentInfo} from "./DocumentInfo";
import {DeviceInfo} from "./DeviceInfo";

export interface QrLinkGet {
  creationDate: string,
  deviceList: DeviceInfo[];
  documentIds: string[],
  documents: DocumentInfo[],
  id: string,
  lastSeen: string,
  sessionName: string,
  sessionType: string,
  sessionValidTime: string,
}
