# n8n Task Manager + Supabase

A Telegram bot for task management built with n8n workflows and Supabase database. Users can create, view, and complete tasks through an intuitive chat interface with inline buttons.

## Features

- ✅ **Add Tasks**: Create new tasks by sending messages
- 📋 **View Tasks**: Display all pending tasks with inline completion buttons
- ✅ **Complete Tasks**: Mark tasks as completed with a single click
- 🔒 **User Isolation**: Each user's tasks are kept separate using Telegram chat IDs
- ⚡ **Real-time Updates**: Instant database synchronization

## Tech Stack

- **Frontend**: Telegram Bot API
- **Backend**: n8n Workflow Automation
- **Database**: Supabase (PostgreSQL)
- **Deployment**: n8n Cloud

## Quick Start

### Prerequisites

- Telegram account
- n8n Cloud account (free tier available)
- Supabase account (free tier available)

### Setup

1. **Create Telegram Bot**
   - Message `@BotFather` on Telegram
   - Send `/newbot` and follow instructions
   - Save the bot token

2. **Setup Supabase Database**
   - Create a new Supabase project
   - Create a `tasks` table with columns: `id`, `user_id`, `title`, `status`, `created_at`
   - Get your project URL and anon key

3. **Import n8n Workflow**
   - Download `workflow-template.json`
   - Import into n8n Cloud
   - Configure Telegram and Supabase credentials
   - Activate the workflow

4. **Test the Bot**
   - Send `/start` to your bot
   - Use the inline buttons to manage tasks

## Database Schema

```sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

- `GET /rest/v1/tasks?user_id=eq.{chat_id}` - Fetch user's tasks
- `POST /rest/v1/tasks` - Create new task
- `PATCH /rest/v1/tasks?id=eq.{task_id}` - Update task status

## License

MIT License