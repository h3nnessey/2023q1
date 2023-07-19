import './styles.css';
import { EngineService } from './services/engine.service';

await EngineService.start(2);
console.log(await EngineService.drive(2));
