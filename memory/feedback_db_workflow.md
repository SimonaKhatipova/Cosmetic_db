---
name: feedback-db-workflow
description: Как работаем с БД — Симона запускает SQL сама через Supabase Dashboard
metadata:
  type: feedback
---

Для любых изменений в БД (INSERT, UPDATE, DDL): я генерирую SQL, Симона запускает сама в Supabase Dashboard → SQL Editor.

**Why:** Попытка делать это через MCP execute_sql заняла 50 минут — слишком медленно. Через Dashboard — секунды.

**How to apply:** Никогда не пытаться грузить данные через execute_sql MCP. Всегда давать готовый SQL-код + инструкцию «запусти в SQL Editor».

Исключение: небольшие одиночные DDL или SELECT-запросы для проверки — можно через MCP.
