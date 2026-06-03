import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'src', 'data', 'initialState.ts');
    
    // Formatting the saved data into TypeScript code
    const fileContent = `import { VitaeData } from '@/types/vitae';\n\nexport const initialVitaeData: VitaeData = ${JSON.stringify(data, null, 2)};\n`;
    
    fs.writeFileSync(filePath, fileContent, 'utf8');
    return NextResponse.json({ success: true, message: 'Data saved to codebase successfully' });
  } catch (error) {
    console.error('Failed to save state:', error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
