import { Job } from './types'

export interface JobTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  data: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>
  isCustom?: boolean
  createdAt?: string
}

export const JOB_TEMPLATES: JobTemplate[] = [
  {
    id: 'hydraulic-leak',
    name: 'Hydraulic System Leak',
    description: 'Repair hydraulic fluid leak',
    category: 'Hydraulic',
    icon: 'Drop',
    data: {
      title: 'Hydraulic System Leak Repair',
      errorCode: 'H-304',
      symptoms: 'Visible hydraulic fluid leak, reduced pressure, sluggish movement',
      fix: 'Inspected hydraulic lines and fittings. Replaced damaged O-ring on cylinder connection. Pressure tested system. Refilled hydraulic fluid to specification.',
      status: 'open'
    }
  },
  {
    id: 'motor-overheat',
    name: 'Motor Overheating',
    description: 'Motor running hot',
    category: 'Electrical',
    icon: 'ThermometerSimple',
    data: {
      title: 'Motor Overheating Issue',
      errorCode: 'E-208',
      symptoms: 'Motor running hot, thermal protection triggering, unusual noise',
      fix: 'Cleaned cooling vents and fan assembly. Checked bearing lubrication. Verified motor current draw is within specification. Replaced thermal sensor.',
      status: 'open'
    }
  },
  {
    id: 'sensor-fault',
    name: 'Sensor Fault',
    description: 'Faulty or disconnected sensor',
    category: 'Electrical',
    icon: 'GitBranch',
    data: {
      title: 'Sensor Malfunction',
      errorCode: 'S-105',
      symptoms: 'Erratic readings, sensor error on display, system not responding correctly',
      fix: 'Tested sensor output voltage. Found wiring harness damaged. Repaired connector and secured wiring. Calibrated sensor and verified readings.',
      status: 'open'
    }
  },
  {
    id: 'belt-replacement',
    name: 'Drive Belt Replacement',
    description: 'Worn or broken drive belt',
    category: 'Mechanical',
    icon: 'ArrowsHorizontal',
    data: {
      title: 'Drive Belt Replacement',
      errorCode: 'M-411',
      symptoms: 'Belt squealing, slipping, visible wear/cracks, reduced power transmission',
      fix: 'Removed old belt and inspected pulleys for wear. Installed new belt with correct tension. Verified alignment and test ran system.',
      status: 'open'
    }
  },
  {
    id: 'plc-error',
    name: 'PLC Communication Error',
    description: 'Controller communication failure',
    category: 'Control',
    icon: 'Cpu',
    data: {
      title: 'PLC Communication Fault',
      errorCode: 'C-602',
      symptoms: 'PLC not responding, communication timeout, I/O modules offline',
      fix: 'Checked network cable connections. Reset communication module. Updated PLC firmware. Restored program from backup. Verified all I/O modules responding.',
      status: 'open'
    }
  },
  {
    id: 'bearing-noise',
    name: 'Bearing Failure',
    description: 'Noisy or damaged bearing',
    category: 'Mechanical',
    icon: 'Circle',
    data: {
      title: 'Bearing Replacement',
      errorCode: 'M-502',
      symptoms: 'Grinding noise, vibration, excessive heat at bearing location',
      fix: 'Disassembled unit and inspected bearings. Found worn ball bearing with pitting. Replaced with OEM bearing. Relubricated and reassembled. Vibration levels normal.',
      status: 'open'
    }
  },
  {
    id: 'pneumatic-leak',
    name: 'Pneumatic Air Leak',
    description: 'Air pressure loss',
    category: 'Pneumatic',
    icon: 'Wind',
    data: {
      title: 'Pneumatic System Air Leak',
      errorCode: 'P-220',
      symptoms: 'Hissing sound, pressure drop, cylinder not holding position',
      fix: 'Performed soap bubble test to locate leak. Found damaged air line fitting. Replaced fitting and secured connections. Pressure tested system at 90 PSI.',
      status: 'open'
    }
  },
  {
    id: 'valve-stuck',
    name: 'Stuck Control Valve',
    description: 'Valve not actuating',
    category: 'Hydraulic',
    icon: 'Valve',
    data: {
      title: 'Control Valve Stuck',
      errorCode: 'H-408',
      symptoms: 'Valve not responding to control signal, system not moving, manual override difficult',
      fix: 'Removed valve and disassembled. Found contamination in spool. Cleaned thoroughly and replaced seals. Reinstalled and cycled valve. Response normal.',
      status: 'open'
    }
  },
  {
    id: 'power-supply',
    name: 'Power Supply Failure',
    description: 'No power or voltage issues',
    category: 'Electrical',
    icon: 'Lightning',
    data: {
      title: 'Power Supply Fault',
      errorCode: 'E-101',
      symptoms: 'No power to control panel, erratic behavior, voltage fluctuations',
      fix: 'Tested incoming voltage and found brownout condition. Checked power supply output - capacitor failure. Replaced power supply unit. Verified all voltages within spec.',
      status: 'open'
    }
  },
  {
    id: 'limit-switch',
    name: 'Limit Switch Failure',
    description: 'Position switch not working',
    category: 'Control',
    icon: 'CornersOut',
    data: {
      title: 'Limit Switch Replacement',
      errorCode: 'C-315',
      symptoms: 'Machine not stopping at end position, safety interlock not working',
      fix: 'Tested switch continuity - found open circuit. Replaced limit switch. Adjusted actuator position. Tested safety interlock cycle.',
      status: 'open'
    }
  },
  {
    id: 'software-update',
    name: 'Software Update',
    description: 'Firmware or software upgrade',
    category: 'Control',
    icon: 'Upload',
    data: {
      title: 'System Software Update',
      errorCode: '',
      symptoms: 'Customer requested update, addressing known bugs, adding new features',
      fix: 'Backed up current configuration. Uploaded new firmware version. Verified all parameters retained. Tested all functions. Documented version change.',
      status: 'open'
    }
  },
  {
    id: 'preventive-maintenance',
    name: 'Preventive Maintenance',
    description: 'Scheduled maintenance service',
    category: 'Maintenance',
    icon: 'Wrench',
    data: {
      title: 'Scheduled Preventive Maintenance',
      errorCode: '',
      symptoms: 'Routine maintenance - no issues reported',
      fix: 'Performed full inspection per maintenance schedule. Lubricated all points. Checked fluid levels. Inspected belts and hoses. Cleaned filters. Verified all safety systems.',
      status: 'open'
    }
  },
  {
    id: 'emergency-stop',
    name: 'E-Stop Not Resetting',
    description: 'Emergency stop circuit fault',
    category: 'Control',
    icon: 'Warning',
    data: {
      title: 'Emergency Stop Circuit Fault',
      errorCode: 'C-999',
      symptoms: 'E-stop button will not reset, safety circuit fault indication',
      fix: 'Checked all E-stop buttons and safety interlocks. Found damaged cable at robot cell. Replaced cable and connectors. Reset safety circuit. Tested all E-stops.',
      status: 'open'
    }
  },
  {
    id: 'encoder-failure',
    name: 'Encoder Not Reading',
    description: 'Position feedback lost',
    category: 'Control',
    icon: 'Barcode',
    data: {
      title: 'Position Encoder Failure',
      errorCode: 'C-550',
      symptoms: 'Position feedback error, erratic movement, encoder signal lost',
      fix: 'Inspected encoder wiring and found loose connection. Cleaned encoder disk and sensor head. Secured all connections. Recalibrated home position.',
      status: 'open'
    }
  },
  {
    id: 'filter-clogged',
    name: 'Clogged Filter',
    description: 'Filter replacement needed',
    category: 'Maintenance',
    icon: 'Funnel',
    data: {
      title: 'Filter Replacement',
      errorCode: 'M-710',
      symptoms: 'Reduced flow, pressure drop across filter, bypass indicator active',
      fix: 'Shut down system and isolated filter. Replaced filter element. Checked for contamination source. Verified flow and pressure normal.',
      status: 'open'
    }
  }
]

export const TEMPLATE_CATEGORIES = [
  'All',
  'Hydraulic',
  'Electrical',
  'Mechanical',
  'Pneumatic',
  'Control',
  'Maintenance',
  'Custom'
] as const

export type TemplateCategory = typeof TEMPLATE_CATEGORIES[number]

export function createTemplateFromJob(
  job: Job,
  name: string,
  description: string,
  category: string = 'Custom'
): JobTemplate {
  return {
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    description,
    category,
    icon: 'Star',
    isCustom: true,
    createdAt: new Date().toISOString(),
    data: {
      title: job.title,
      customer: '',
      location: '',
      machineModel: job.machineModel,
      serialNo: '',
      errorCode: job.errorCode,
      symptoms: job.symptoms,
      fix: job.fix,
      status: 'open'
    }
  }
}
