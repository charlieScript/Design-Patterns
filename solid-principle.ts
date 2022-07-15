// Single responsibility principle
/**
 * The single responsibility principle declares that a class should only be responsible for a single functionality. The above also refers to modules and functions.
 */
class Statistics {
  /**
   * computeSalesStatistics
   */
  public computeSalesStatistics() {}
}

// Open-closed principle
/**
 * Entities should be open for extension, but closed for modification.
 */
interface Shape {
  getArea(): number;
}

class Square implements Shape {
  public area: number;
  constructor(area: number) {
    this.area = area;
  }
  getArea(): number {
    return this.area * this.area;
  }
}

class Rectangle implements Shape {
  public length: number;
  public breadth: number;
  constructor(length: number, breadth: number) {
    this.length = length;
    this.breadth = breadth;
  }
  getArea(): number {
    return this.length + this.breadth;
  }
}
// example 2
interface LanguageProvider {
  greet(): string;
}
class EnLanguageProvider implements LanguageProvider {
  // Returns a greeting in english
  greet(): string {
    return 'Hello';
  }
}

class FrLanguageProvider implements LanguageProvider {
  // Returns a greeting in english
  greet(): string {
    return 'Hello';
  }
}

// OCP-Compliant ✅
class GreetingService {
  languageProvider: LanguageProvider;

  constructor(languageProvider: LanguageProvider) {
    this.languageProvider = languageProvider;
  }

  // Returns a greeting for the configured language provider
  execute(): string {
    return this.languageProvider.greet();
  }
}

const r = new Square(10);
const t = new GreetingService(new EnLanguageProvider);
console.log(r.getArea());
console.log(t.languageProvider);


/**
 * Liskov Substitution Principle
Subclasses should be substitutable for their base class.
 */
interface Shape2 {
  area: number;
}

class Rectangle2 implements Shape2 {
  constructor(private width: number, private height: number) {}

  public setWidth(width: number) {
    this.width = width;
  }

  public setHeight(height: number) {
    this.height = height;
  }

  public get area(): number {
    return this.width * this.height;
  }
}

class Square2 implements Shape2 {
  constructor(private size: number) {}

  public setSize(size: number) {
    this.size = size;
  }

  public get area(): number {
    return this.size ** 2;
  }
}

/**
 * Dependency Inversion Principle
High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions
 */
class Employee implements EmployeeRepository {
  get(id: number): Promise<Employee> {
    throw new Error("Method not implemented.");
  }
  update(employee: Employee): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  terminate(id: number) {
    return id
    throw new Error('Method not implemented.');
  }
  onMedicalLeave: any;
  isRetired: any;
}

interface EmployeeRepository {
  get(id: number): Promise<Employee>;
  update(employee: Employee): Promise<boolean>;
}

class TerminateEmployeeHandler {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    // Database details are hidden behind the repository abstraction ✅
    this.employeeRepository = employeeRepository;
  }

  async execute(id: number): Promise<string> {
    // No low-level data access, entity is fetched using dependency-free abstraction ✅
    const employee = await this.employeeRepository.get(id);

    // 🔼 High-level business rule
    if (employee?.onMedicalLeave) {
      return "done"
    }

    // 🔼 High-level business rule
    if (employee?.isRetired) {
      return `Employee ${id} is retired and cannot be terminated!`;
    }

    employee.terminate(id);

    // Entity is updated through abstraction ✅
    this.employeeRepository.update(employee);

    return `Employee ${id} terminated successfully!`
  }
}

// payment system
interface paymentActions {
  amount: number;
  pay(): number;
  deduct(): number;
}
// incase paypal breaks
class Paypal implements paymentActions {
  amount: number;
  constructor(amount: number) {
    this.amount = amount
  }
  pay(): number {
    throw new Error("Method not implemented.");
  }
  deduct(): number {
    throw new Error("Method not implemented.");
  }

}
class GooglePay implements paymentActions {
  amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  pay(): number {
    throw new Error('Method not implemented.');
  }
  deduct(): number {
    throw new Error('Method not implemented.');
  }
}

class Store {
  amount: number;
  actions: paymentActions
  constructor(amount: number, actions: paymentActions) {
    this.amount = amount
    this.actions = actions;
  }
  
  checkout() {
    console.log(this.actions.amount);
  }

}

const store = new Store(20, new GooglePay(20))
store.checkout()
