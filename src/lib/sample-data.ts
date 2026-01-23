import { Job, Attachment, Document } from './types'
import { generateId } from './helpers'

export function generateSampleImage(text: string, bgColor: string, textColor: string): string {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return ''
  
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, 800, 600)
  
  ctx.fillStyle = textColor
  ctx.font = 'bold 32px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  const lines = text.split('\n')
  lines.forEach((line, index) => {
    ctx.fillText(line, 400, 250 + (index * 50))
  })
  
  ctx.font = '16px monospace'
  ctx.fillText(`ID: ${generateId()}`, 400, 500)
  
  return canvas.toDataURL('image/png').split(',')[1]
}

export function generateSamplePDF(title: string, content: string): string {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
50 750 Td
(${title}) Tj
0 -50 Td
/F1 12 Tf
(${content.replace(/\n/g, ') Tj 0 -20 Td (')}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000317 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
566
%%EOF`
  
  return btoa(pdfContent)
}

export function createSampleJobs(): Job[] {
  const now = new Date()
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  return [
    {
      id: generateId(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      title: 'CNC Machine Control Panel Failure',
      customer: 'TechWorks Manufacturing GmbH',
      location: 'Berlin, Germany - Production Hall A',
      machineModel: 'Siemens SINUMERIK 840D',
      serialNo: 'SN-840D-2023-4567',
      errorCode: 'E-2145',
      symptoms: 'Control panel displays error E-2145, spindle motor not responding to commands, emergency stop LED remains illuminated even after reset.',
      fix: 'Diagnosed faulty relay in emergency stop circuit. Replaced relay R47 on control board CB-12. Tested all safety interlocks. Performed full system calibration and test run.',
      status: 'completed'
    },
    {
      id: generateId(),
      createdAt: dayAgo.toISOString(),
      updatedAt: dayAgo.toISOString(),
      title: 'Hydraulic Press Pressure Loss',
      customer: 'AutoParts Industries',
      location: 'Stuttgart, Germany - Workshop 3',
      machineModel: 'Bosch Rexroth HydroPress 5000',
      serialNo: 'BP5000-2021-8923',
      errorCode: 'H-0789',
      symptoms: 'Hydraulic pressure dropping from 3000 PSI to 1200 PSI during operation. Oil temperature elevated to 85°C. Unusual noise from pump assembly.',
      fix: 'Identified worn hydraulic seals in cylinder C2 and damaged pressure valve V8. Replaced seals, installed new pressure valve, flushed and replaced hydraulic oil. System now maintains stable 3000 PSI.',
      status: 'completed'
    },
    {
      id: generateId(),
      createdAt: weekAgo.toISOString(),
      updatedAt: new Date(weekAgo.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      title: 'Industrial Robot Calibration Error',
      customer: 'Precision Robotics Solutions',
      location: 'Munich, Germany - Lab 7',
      machineModel: 'KUKA KR 210 R2700',
      serialNo: 'KR210-2022-3456',
      errorCode: 'R-5523',
      symptoms: 'Robot arm positioning drift detected, calibration values inconsistent, axis 4 encoder reporting intermittent signal loss.',
      fix: 'Replaced faulty encoder on axis 4, performed complete 6-axis recalibration using KUKA.WorkVisual software, updated firmware to v8.6.3, verified positioning accuracy within ±0.02mm tolerance.',
      status: 'completed'
    },
    {
      id: generateId(),
      createdAt: weekAgo.toISOString(),
      updatedAt: now.toISOString(),
      title: 'Conveyor Belt System Malfunction',
      customer: 'Logistics Express Warehouse',
      location: 'Hamburg, Germany - Distribution Center',
      machineModel: 'Siemens SIMATIC S7-1500 PLC',
      serialNo: 'S7-1500-2020-7712',
      errorCode: 'C-1034',
      symptoms: 'Conveyor belt intermittently stops, PLC showing communication timeout with motor controller, HMI displays "Drive not ready" error.',
      fix: 'Currently investigating. Checked PROFINET cable connections - found loose connector at switch port 12. Replaced cable. Monitoring system for 24 hours to ensure stability. Awaiting parts for motor controller backup unit.',
      status: 'in-progress'
    },
    {
      id: generateId(),
      createdAt: monthAgo.toISOString(),
      updatedAt: monthAgo.toISOString(),
      title: 'Laser Cutting Machine Beam Alignment',
      customer: 'MetalCraft Industries',
      location: 'Frankfurt, Germany - Facility B',
      machineModel: 'Trumpf TruLaser 3030',
      serialNo: 'TL3030-2019-5634',
      errorCode: 'L-4421',
      symptoms: 'Laser beam not cutting through material consistently, edge quality poor, focal point appears off-center on test pattern.',
      fix: 'Performed mirror alignment procedure, cleaned all optical components, replaced beam splitter optic due to thermal damage, recalibrated focus lens position, adjusted gas pressure to 18 bar. Test cuts show clean edges within specification.',
      status: 'completed'
    },
    {
      id: generateId(),
      createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
      title: 'Air Compressor Overheating',
      customer: 'BuildTech Construction Supply',
      location: 'Dresden, Germany - Main Workshop',
      machineModel: 'Atlas Copco GA 75 VSD',
      serialNo: 'GA75-2023-2341',
      errorCode: 'A-8876',
      symptoms: 'Compressor shutdown with high temperature alarm, coolant temperature sensor reading 105°C, cooling fan not operating at full speed.',
      fix: 'Diagnosed failed cooling fan motor. Ordered replacement part (ETA 2 days). Temporarily running compressor at 60% capacity with external cooling. Customer approved temporary solution.',
      status: 'in-progress'
    }
  ]
}

export function createSampleAttachments(jobs: Job[]): Attachment[] {
  const attachments: Attachment[] = []
  
  jobs.forEach((job, index) => {
    if (index === 0) {
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'control_panel_error_display.png',
        mimeType: 'image/png',
        data: generateSampleImage('SIEMENS\nSINUMERIK 840D\nERROR E-2145\nSPINDLE FAULT', '#1a1a2e', '#ff6b6b'),
        createdAt: new Date(job.createdAt).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'replaced_relay_component.png',
        mimeType: 'image/png',
        data: generateSampleImage('Relay R47\nControl Board CB-12\nReplaced Component', '#2d3436', '#00b894'),
        createdAt: new Date(Date.parse(job.createdAt) + 30 * 60 * 1000).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'repair_report.pdf',
        mimeType: 'application/pdf',
        data: generateSamplePDF(
          'Service Report - CNC Machine',
          'Customer: TechWorks Manufacturing\nMachine: Siemens SINUMERIK 840D\nError Code: E-2145\n\nDiagnosis:\nFaulty relay in emergency stop circuit causing spindle motor failure.\n\nParts Replaced:\n- Relay R47 on control board CB-12\n\nTests Performed:\n- Safety interlock verification\n- System calibration\n- Full operational test run\n\nResult: Machine fully operational'
        ),
        createdAt: new Date(Date.parse(job.createdAt) + 60 * 60 * 1000).toISOString()
      })
    }
    
    if (index === 1) {
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'hydraulic_seal_damage.png',
        mimeType: 'image/png',
        data: generateSampleImage('Worn Hydraulic Seals\nCylinder C2\nBefore Repair', '#34495e', '#e74c3c'),
        createdAt: new Date(job.createdAt).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'pressure_valve_replacement.png',
        mimeType: 'image/png',
        data: generateSampleImage('New Pressure Valve V8\nInstalled\n3000 PSI Rating', '#2c3e50', '#3498db'),
        createdAt: new Date(Date.parse(job.createdAt) + 45 * 60 * 1000).toISOString()
      })
    }
    
    if (index === 2) {
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'robot_encoder_fault.png',
        mimeType: 'image/png',
        data: generateSampleImage('KUKA KR210\nAxis 4 Encoder\nSignal Loss Detected', '#0f0f1e', '#ffd700'),
        createdAt: new Date(job.createdAt).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'calibration_report.pdf',
        mimeType: 'application/pdf',
        data: generateSamplePDF(
          'KUKA Robot Calibration Report',
          'Robot Model: KUKA KR 210 R2700\nSerial: KR210-2022-3456\n\nCalibration Results:\nAxis 1: ±0.015mm\nAxis 2: ±0.018mm\nAxis 3: ±0.012mm\nAxis 4: ±0.019mm (after encoder replacement)\nAxis 5: ±0.014mm\nAxis 6: ±0.016mm\n\nAll axes within ±0.02mm tolerance specification.\nFirmware updated to v8.6.3\nCalibration completed successfully.'
        ),
        createdAt: new Date(Date.parse(job.createdAt) + 90 * 60 * 1000).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'new_encoder_installed.png',
        mimeType: 'image/png',
        data: generateSampleImage('New Encoder\nAxis 4\nInstalled & Tested', '#1a1a2e', '#00d2d3'),
        createdAt: new Date(Date.parse(job.createdAt) + 60 * 60 * 1000).toISOString()
      })
    }
    
    if (index === 3) {
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'plc_error_screen.png',
        mimeType: 'image/png',
        data: generateSampleImage('SIMATIC S7-1500\nDRIVE NOT READY\nComm Timeout', '#1e1e1e', '#ff6b6b'),
        createdAt: new Date(job.createdAt).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'network_diagram.pdf',
        mimeType: 'application/pdf',
        data: generateSamplePDF(
          'PROFINET Network Diagram',
          'Conveyor System Network Layout\n\nPLC: Siemens S7-1500 (192.168.1.10)\nSwitch: Port 12 - Motor Controller\nHMI: Touch Panel (192.168.1.20)\n\nIssue Found:\nLoose cable connection at switch port 12\n\nAction Taken:\nReplaced PROFINET cable\nVerified connection integrity\nMonitoring for 24 hours'
        ),
        createdAt: new Date(Date.parse(job.createdAt) + 30 * 60 * 1000).toISOString()
      })
    }
    
    if (index === 4) {
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'laser_beam_pattern_before.png',
        mimeType: 'image/png',
        data: generateSampleImage('Trumpf TruLaser\nTest Pattern BEFORE\nPoor Edge Quality', '#2d2d2d', '#ff9ff3'),
        createdAt: new Date(job.createdAt).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'laser_beam_pattern_after.png',
        mimeType: 'image/png',
        data: generateSampleImage('Trumpf TruLaser\nTest Pattern AFTER\nClean Edges ✓', '#2d2d2d', '#00ff87'),
        createdAt: new Date(Date.parse(job.createdAt) + 120 * 60 * 1000).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'beam_splitter_thermal_damage.png',
        mimeType: 'image/png',
        data: generateSampleImage('Beam Splitter Optic\nThermal Damage\nReplacement Required', '#1a1a1a', '#ffa502'),
        createdAt: new Date(Date.parse(job.createdAt) + 45 * 60 * 1000).toISOString()
      })
    }
    
    if (index === 5) {
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'compressor_temperature_alarm.png',
        mimeType: 'image/png',
        data: generateSampleImage('Atlas Copco GA 75\nTEMP ALARM\n105°C', '#2c2c2c', '#ff3838'),
        createdAt: new Date(job.createdAt).toISOString()
      })
      attachments.push({
        id: generateId(),
        jobId: job.id,
        filename: 'cooling_fan_failure.png',
        mimeType: 'image/png',
        data: generateSampleImage('Cooling Fan Motor\nFAILED\nReplacement Ordered', '#252525', '#feca57'),
        createdAt: new Date(Date.parse(job.createdAt) + 20 * 60 * 1000).toISOString()
      })
    }
  })
  
  return attachments
}

export function createSampleDocuments(): Document[] {
  return [
    {
      id: generateId(),
      title: 'Siemens SINUMERIK 840D Service Manual',
      filename: 'sinumerik_840d_service_manual.pdf',
      content: generateSamplePDF(
        'SINUMERIK 840D Service Manual',
        'Chapter 1: System Overview\nThe SINUMERIK 840D is a CNC control system for machine tools.\n\nChapter 2: Error Codes\nE-2145: Emergency stop circuit fault\n- Check relay R47 on control board CB-12\n- Verify safety interlock connections\n- Test emergency stop button functionality\n\nChapter 3: Maintenance Procedures\nRegular maintenance schedule:\n- Weekly: Check emergency stop function\n- Monthly: Inspect relay contacts\n- Quarterly: Full system calibration\n\nChapter 4: Troubleshooting\nSpindle motor not responding:\n1. Check control board indicators\n2. Verify power supply voltage\n3. Test relay circuits\n4. Inspect wiring connections'
      ),
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: 'Hydraulic Systems Troubleshooting Guide',
      filename: 'hydraulic_systems_guide.pdf',
      content: generateSamplePDF(
        'Hydraulic Systems Guide',
        'Pressure Loss Diagnostics\n\nCommon Causes:\n1. Worn seals in hydraulic cylinders\n2. Damaged pressure relief valves\n3. Contaminated hydraulic oil\n4. Air in hydraulic lines\n\nDiagnostic Procedure:\n- Measure system pressure at multiple points\n- Check oil temperature (normal: 40-65°C)\n- Inspect seals for wear or damage\n- Test pressure valves for proper operation\n\nSeal Replacement:\n- Use only manufacturer-approved seals\n- Clean cylinder bore before installation\n- Lubricate seals during assembly\n- Test system gradually to rated pressure\n\nOil Service:\n- Change oil every 2000 operating hours\n- Use ISO VG 46 hydraulic oil\n- Check oil level daily'
      ),
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: 'KUKA Robot Calibration Procedures',
      filename: 'kuka_calibration_procedures.pdf',
      content: generateSamplePDF(
        'KUKA Robot Calibration',
        'KR 210 R2700 Calibration Guide\n\nEncoder Replacement:\n1. Power down robot and lock all axes\n2. Remove encoder cover on affected axis\n3. Disconnect encoder cable\n4. Install new encoder, align reference marks\n5. Reconnect cable, secure cover\n\nCalibration Steps:\n1. Launch KUKA.WorkVisual software\n2. Select "Calibration" menu\n3. Choose "6-Axis Calibration"\n4. Follow on-screen instructions\n5. Use calibration tool at TCP\n6. Verify accuracy within ±0.02mm\n\nFirmware Update:\n- Current version: v8.6.3\n- Update improves position accuracy\n- Backup current configuration before update\n- Update duration: approximately 15 minutes'
      ),
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: 'PROFINET Network Configuration',
      filename: 'profinet_network_config.pdf',
      content: generateSamplePDF(
        'PROFINET Configuration',
        'Industrial Network Best Practices\n\nCable Requirements:\n- Use industrial-grade shielded cables\n- Maximum length: 100m between devices\n- Proper grounding essential\n- Check connectors regularly\n\nTroubleshooting Communication Errors:\n1. Verify physical cable connections\n2. Check network topology in TIA Portal\n3. Scan for device conflicts\n4. Monitor network diagnostics\n5. Replace suspect cables\n\nCommon Issues:\n- Loose connectors at switch ports\n- Cable damage from mechanical stress\n- Electromagnetic interference\n- Incorrect IP address configuration\n\nPLC Programming:\n- Use Siemens SIMATIC S7-1500\n- Configure PROFINET devices in hardware config\n- Set appropriate scan cycle times'
      ),
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      title: 'Laser Safety and Maintenance',
      filename: 'laser_safety_maintenance.pdf',
      content: generateSamplePDF(
        'Laser System Maintenance',
        'Trumpf TruLaser Maintenance Guide\n\nOptical System Care:\n- Clean mirrors weekly with lint-free cloth\n- Inspect beam path daily\n- Check focal lens for contamination\n- Replace damaged optics immediately\n\nAlignment Procedures:\n1. Set laser to alignment mode (low power)\n2. Check beam position at each mirror\n3. Adjust mirror mounts if needed\n4. Verify beam center on focusing lens\n5. Test cut quality on sample material\n\nCommon Optics Issues:\n- Thermal damage from excessive power\n- Contamination from cutting debris\n- Mechanical misalignment\n- Mirror coating degradation\n\nGas Pressure Settings:\n- Oxygen: 18 bar for steel cutting\n- Nitrogen: 15 bar for stainless\n- Check pressure regulators weekly'
      ),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}
