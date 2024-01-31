import { setProvider, getProvider, Program, AnchorProvider } from '@coral-xyz/anchor';
import dotenv from 'dotenv';
import { PROGRAM_ID } from './types/programId';
import { IDL as PROGRAM_IDL } from './types/types';

dotenv.config();

let programId = PROGRAM_ID;

setProvider(AnchorProvider.env());

export const provider = getProvider() as AnchorProvider;

export const program = new Program(PROGRAM_IDL, programId, provider);