let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new (require('@prisma/client').PrismaClient)();
} else {
  if (!global.prisma) {
    global.prisma = new (require('@prisma/client').PrismaClient)();
  }
  prisma = global.prisma;
}

export default prisma; 