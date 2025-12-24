# Setting Up Python Virtual Environment for BookBridge Backend

## Step-by-Step Instructions for Windows

### Step 1: Navigate to the Backend Directory
```powershell
cd backend
```
**Explanation**: Changes your current directory to the `backend` folder where the Django project is located.

### Step 2: Create the Virtual Environment
```powershell
python -m venv venv
```
**Explanation**: Creates a new virtual environment named `venv` in the current directory. This isolates your project dependencies from other Python projects on your system.

**Alternative** (if `python` doesn't work):
```powershell
py -m venv venv
```
**Explanation**: Uses the Python launcher, which is more reliable on Windows systems with multiple Python installations.

### Step 3: Activate the Virtual Environment

**For PowerShell:**
```powershell
venv\Scripts\Activate.ps1
```

**If you get an execution policy error**, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**For Command Prompt (cmd):**
```cmd
venv\Scripts\activate.bat
```

**Explanation**: Activates the virtual environment. You'll see `(venv)` at the beginning of your command prompt, indicating the environment is active. All Python packages you install will now be isolated to this project.

### Step 4: Upgrade pip (Recommended)
```powershell
python -m pip install --upgrade pip
```
**Explanation**: Upgrades pip to the latest version, ensuring you have the most recent package installer with bug fixes and improvements.

### Step 5: Install Project Dependencies
```powershell
pip install -r requirements.txt
```
**Explanation**: Installs all the Python packages listed in `requirements.txt` (Django, Django REST Framework, MySQL client, etc.) into your virtual environment.

### Step 6: Verify Installation
```powershell
python manage.py --version
```
**Explanation**: Checks if Django is properly installed by displaying the Django version.

## Complete Command Sequence

Here's the complete sequence of commands:

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (PowerShell)
venv\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Verify Django installation
python manage.py --version
```

## Deactivating the Virtual Environment

When you're done working, deactivate the virtual environment:
```powershell
deactivate
```
**Explanation**: Deactivates the virtual environment and returns your terminal to the system's default Python environment.

## Troubleshooting

### Issue: "python is not recognized"
**Solution**: Use `py` instead of `python`, or ensure Python is added to your system PATH.

### Issue: "Execution Policy" error in PowerShell
**Solution**: Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` and then try activating again.

### Issue: "pip is not recognized"
**Solution**: Make sure the virtual environment is activated (you should see `(venv)` in your prompt).

## Notes

- The `venv` folder is already in `.gitignore`, so it won't be committed to version control
- Always activate the virtual environment before working on the project
- Each time you open a new terminal, you'll need to activate the virtual environment again

