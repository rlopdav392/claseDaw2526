# Sistema de Agentes

El agente debe seguir estrictamente ARCHITECTURE.md.

## Roles

Builder-Orchestrator → agents/builder.md  
Tester-Reviewer → agents/tester.md  
Docs-Finisher → agents/docs.md  

## Flujo

1. Builder implementa fase
2. Tester valida

PHASE OK  
FIX REQUIRED

3. Si FIX REQUIRED → corregir
4. Si PHASE OK → siguiente fase
5. Final → Docs-Finisher