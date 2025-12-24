# Installing mysqlclient on Windows

The `mysqlclient` package requires compilation on Windows, which needs Microsoft Visual C++ Build Tools.

## Option 1: Install Microsoft Visual C++ Build Tools (Recommended)

1. Download and install **Microsoft C++ Build Tools** from:
   https://visualstudio.microsoft.com/visual-cpp-build-tools/

2. During installation, select "C++ build tools" workload

3. After installation, restart your terminal and run:
   ```powershell
   cd backend
   venv\Scripts\Activate.ps1
   pip install mysqlclient==2.2.0
   ```

## Option 2: Use Pre-compiled Wheel (Easier)

If you have a compatible Python version, you can try installing a pre-compiled wheel:

```powershell
cd backend
venv\Scripts\Activate.ps1
pip install mysqlclient
```

If this doesn't work, proceed with Option 1.

## Option 3: Use PyMySQL as Alternative (Temporary Solution)

If you need to proceed without installing build tools, you can use PyMySQL as a drop-in replacement:

1. Install PyMySQL:
   ```powershell
   pip install PyMySQL
   ```

2. Add this to your `bookbridge/__init__.py`:
   ```python
   import pymysql
   pymysql.install_as_MySQLdb()
   ```

3. Update `requirements.txt` to include PyMySQL instead of mysqlclient for development.

**Note**: PyMySQL is pure Python and doesn't require compilation, but mysqlclient is generally faster and recommended for production.

## Verify Installation

After installing mysqlclient, verify it works:

```powershell
python -c "import MySQLdb; print('mysqlclient installed successfully!')"
```

